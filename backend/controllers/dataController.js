const Data = require('../models/Data');

// Get all data with filters and pagination
exports.getData = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 25,
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      country
    } = req.query;

    // Build filter object
    const filter = {};
    if (end_year) filter.end_year = end_year;
    if (topic) filter.topic = { $regex: topic, $options: 'i' };
    if (sector) filter.sector = { $regex: sector, $options: 'i' };
    if (region) filter.region = { $regex: region, $options: 'i' };
    if (pestle) filter.pestle = { $regex: pestle, $options: 'i' };
    if (source) filter.source = { $regex: source, $options: 'i' };
    if (country) filter.country = { $regex: country, $options: 'i' };

    const data = await Data.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Data.countDocuments(filter);

    res.json({
      data,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
exports.getStatistics = async (req, res) => {
  try {
    const totalRecords = await Data.countDocuments();
    const sectors = await Data.distinct('sector');
    const countries = await Data.distinct('country');
    const regions = await Data.distinct('region');
    const topics = await Data.distinct('topic');

    const intensityStats = await Data.aggregate([
      { $match: { intensity: { $ne: null } } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$intensity' },
          max: { $max: '$intensity' },
          min: { $min: '$intensity' }
        }
      }
    ]);

    const likelihoodStats = await Data.aggregate([
      { $match: { likelihood: { $ne: null } } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$likelihood' },
          max: { $max: '$likelihood' },
          min: { $min: '$likelihood' }
        }
      }
    ]);

    res.json({
      totalRecords,
      totalSectors: sectors.filter(s => s).length,
      totalCountries: countries.filter(c => c).length,
      totalRegions: regions.filter(r => r).length,
      totalTopics: topics.filter(t => t).length,
      intensityStats: intensityStats[0] || {},
      likelihoodStats: likelihoodStats[0] || {}
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get filter options
exports.getFilterOptions = async (req, res) => {
  try {
    const [endYears, sectors, topics, regions, pestles, sources, countries] = await Promise.all([
      Data.distinct('end_year'),
      Data.distinct('sector'),
      Data.distinct('topic'),
      Data.distinct('region'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('country')
    ]);

    res.json({
      endYears: endYears.filter(year => year).sort(),
      sectors: sectors.filter(sector => sector).sort(),
      topics: topics.filter(topic => topic).sort(),
      regions: regions.filter(region => region).sort(),
      pestles: pestles.filter(pestle => pestle).sort(),
      sources: sources.filter(source => source).sort(),
      countries: countries.filter(country => country).sort()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get chart data
exports.getChartData = async (req, res) => {
  try {
    const { type } = req.query;

    let aggregation = [];

    switch (type) {
      case 'intensity':
        aggregation = [
          { $match: { intensity: { $ne: null }, sector: { $ne: "" } } },
          { $group: { _id: '$sector', value: { $avg: '$intensity' } } },
          { $sort: { value: -1 } },
          { $limit: 10 }
        ];
        break;

      case 'likelihood':
        aggregation = [
          { $match: { likelihood: { $ne: null }, topic: { $ne: "" } } },
          { $group: { _id: '$topic', value: { $avg: '$likelihood' } } },
          { $sort: { value: -1 } },
          { $limit: 10 }
        ];
        break;

      case 'relevance':
        aggregation = [
          { $match: { relevance: { $ne: null }, region: { $ne: "" } } },
          { $group: { _id: '$region', value: { $avg: '$relevance' } } },
          { $sort: { value: -1 } },
          { $limit: 10 }
        ];
        break;

      case 'country':
        aggregation = [
          { $match: { country: { $ne: "" } } },
          { $group: { _id: '$country', value: { $sum: 1 } } },
          { $sort: { value: -1 } },
          { $limit: 15 }
        ];
        break;

      case 'sector':
        aggregation = [
          { $match: { sector: { $ne: "" } } },
          { $group: { _id: '$sector', value: { $sum: 1 } } },
          { $sort: { value: -1 } },
          { $limit: 8 }
        ];
        break;

      default:
        return res.status(400).json({ message: 'Invalid chart type' });
    }

    const result = await Data.aggregate(aggregation);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
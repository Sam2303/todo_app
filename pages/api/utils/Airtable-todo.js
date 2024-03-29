const Airtable = require("airtable");
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

const table = base(process.env.AIRTABLE_TODO_TABLE_NAME);

const getMinifiedRecord = (record) => {
    return {
      id: record.id,
      fields: record.fields,
    };
  };
  
  const minifyRecords = (records) => {
    return records.map((record) => getMinifiedRecord(record));
  };

  export {getMinifiedRecord, minifyRecords, table}
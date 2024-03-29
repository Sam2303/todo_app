import { table, getMinifiedRecord } from "./utils/Airtable-todo";

export default async (req, res) => {
  const { id, fields } = req.body;
  try {
    const updatedRecords = await table.update([{ id, fields }]);
    res.status(200);
    res.json(getMinifiedRecord(updatedRecords[0]));
  } catch (err) {
    console.error(err);
    res.status(500);
    res.json({ msg: "Something went wrong" });
  }
};

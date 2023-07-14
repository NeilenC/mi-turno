import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    await clientPromise;

    res.send({
      props: { isConnected: true },
    });
  } catch (e) {
    console.error(e);
    res.send({
      props: { isConnected: false },
    });
  }
}

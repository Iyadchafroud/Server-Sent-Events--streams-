//express server    
import express from 'express'
const app = express();
const port = 8080;

app.get('/v1/shops', async(req, res) => {
  try {
    //get data from table and send it
    // eslint-disable-next-line no-undef
    const resultQuery =await getfromtable()
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Transfer-Encoding": "identity",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
      Connection: "keep-alive", //        "Connection": "keep-alive", maintain the connection between the devices
    });
    res.write(`event: structure\n`);
    res.write(`data: ${JSON.stringify(resultQuery.structure)}\n\n`);
    res.write(`event: rows\n`);

    res.write(`data: {"data": ${JSON.stringify(resultQuery.rows)}}\n\n`);
    res.write(`event: end\n`);
    res.write(`data: end fetch \n\n`);
    res.end();

  } catch (error) {
console.error("Error:", error);    
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

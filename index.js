const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

let laddoos = [
    {id:1,
    name: "besan ke laddu",
    price: 200,
    weight: 1,
    unit: "Kilograms"  
  }
];

app.use(express.json());


app.get( "/laddoos", (request,response)=>{
    const headers = request.headers;
    response.status(200).json({
        message: "Laddoos fetch successfully",
        data: laddoos    
    });
});

app.post("/add",(req,res)=>{
    const { id, name, price, weight, unit } = req.body;
    const body = req.body;
    
    // need all the field in a laddo0
    if (!id || !name || !price || !weight || !unit) {
    return res.status(400).json({
      error: "Invalid laddoo data. Required: id, name, price, weight, unit."
    });
  }

    // Check for duplicate id
  if (laddoos.some(l => l.id === id)) {
    return res.status(409).json({ error: `Laddoo with id ${id} already exists.` });
  }

  const newLaddoo = { id, name, price, weight, unit };
  laddoos.push(newLaddoo);
    res.status(201).json({
        status: "Laddoo Added Success",
        data: body    
    });
});

// app.put("/edit/:id",(req,res)=>{
//     const body = req.body;
//     // const id = req.params.id;
//     // the id from params is in string need to parse into integer
//     const id = parseInt(req.params.id);

//     for (let index = 0; index < laddoos.length; index++) {
//         const element = laddoos[index];
//         if(element.id === id){
//             laddoos[index] = body;
//             res.status(202).json({
//                 message: "Laddoo Edit Success",
//                 data:body
//             });
//         }
        
//     }
//    res.status(401).json({
//     message:"Laddoo not Found !!",
//     data: "No laddoo found with id "+id+"."
//    });
// });

// improved edit code
app.put("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const laddooIndex = laddoos.findIndex(l => l.id === id);

  if (laddooIndex === -1) {
    return res.status(404).json({ error: `Laddoo with id ${id} not found.` });
  }

  const { name, price, weight, unit } = req.body;
  if (!name || !price || !weight || !unit) {
    return res.status(400).json({ error: "Invalid laddoo data." });
  }

  laddoos[laddooIndex] = { id, name, price, weight, unit };

  res.status(200).json({
    message: "Laddoo updated successfully!",
    data: laddoos[laddooIndex]
  });
});



// app.delete("/remove/:id",(req,res)=> {
//    // const id = req.params.id;
//     // the id from params is in string need to parse into integer
//     const id = parseInt(req.params.id);
//     for (const item in laddoos) {
//         if (item.id === id) {
//             const laddoo = item;
//             laddoos.splice(id);
//             res.status(2030).json({
//                 message:"Laddoo Remove Success !!",
//                 data: laddoo
//             });
//         }       
        
//     }
//     res.status(300).json({
//         message:"Laddoo not Found !!",
//         data: "No laddoo found with id "+id+"."
//     });
// });

// improved delete code
app.delete("/remove/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = laddoos.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `No laddoo found with id ${id}.` });
  }

  const removed = laddoos.splice(index, 1);  // remove 1 item
  res.status(200).json({
    message: "Laddoo removed successfully!",
    data: removed[0]
  });
});


app.get("/welcome", (req, res) => {
    const name = req.query.name || "Guest";
    res.json({
        message:"Hello "+name+"!! Welcome to TunTun Mousi's Laddo shop admin api"
    });
});

//. endpoint to get documentations (not a standard practice, but a good thing to learn at begginner level, although this was create using gpt.)
app.get("/docs", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Laddoo Shop API Docs</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
          h1 { color: #b5651d; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 5px; }
          .endpoint { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>🍬 Laddoo Shop API Documentation</h1>
        <p>Welcome to TunTun Mousi's Laddoo Shop API. Below are the available endpoints:</p>
        
        <div class="endpoint">
          <h2>GET /laddoos</h2>
          <p>Returns all laddoos.</p>
          <pre>
Response 200:
{
  "status": "success",
  "data": [ { "id": 1, "name": "Besan ke Laddu", "price": 200, "weight": 1, "unit": "Kilograms" } ]
}
          </pre>
        </div>

        <div class="endpoint">
          <h2>POST /add</h2>
          <p>Add a new laddoo.</p>
          <pre>
Request Body:
{
  "id": 2,
  "name": "Motichoor Laddoo",
  "price": 300,
  "weight": 1,
  "unit": "Kilograms"
}
          </pre>
        </div>

        <div class="endpoint">
          <h2>PUT /edit/:id</h2>
          <p>Update an existing laddoo by ID.</p>
          <pre>
PUT /edit/1

Request Body:
{
  "name": "Besan Laddoo",
  "price": 250,
  "weight": 1,
  "unit": "Kilograms"
}
          </pre>
        </div>

        <div class="endpoint">
          <h2>DELETE /remove/:id</h2>
          <p>Delete a laddoo by ID.</p>
          <pre>
DELETE /remove/1
          </pre>
        </div>

      </body>
    </html>
  `);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


 
const express = require ("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'canalesarmada'

});
//1
app.post('/create',(req, res)=>{
    const canal = req.body.canal
    const frecuencia = req.body.frecuencia
    const modo = req.body.modo
    const uso = req.body.uso

    
    db.query('INSERT INTO canales(canal,frecuencia,modo,uso) VALUES(?,?,?,?)',[canal,frecuencia,modo,uso],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});



//2
app.get('/canales',(req, res)=>{
    db.query('SELECT * FROM canales',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

//3
app.put('/update',(req, res)=>{
    const id = req.body.id;
    const canal = req.body.canal;
    const frecuencia = req.body.frecuencia;
    const modo = req.body.modo;
    const uso = req.body.uso;

    
    db.query('UPDATE canales SET canal=?,frecuencia=?,modo=?,uso=? WHERE id=?',[canal,frecuencia,modo,uso,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

//4
app.delete('/delete/:id',(req, res)=>{
    const id = req.params.id;

    db.query('DELETE FROM canales WHERE id=?',id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log("Corriendo en el puerto 3001")
})

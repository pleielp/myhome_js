const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()

app.locals.pretty = true;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/test1', (req,res) =>{
//     res.send('hello wodld');
// })

app.get('/test/edit', (req,res) =>{
    fs.readdir('data', (err,files) =>{
        if(err){
            console.log(files);
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('test2', {topics:files});
    })
})

app.get(['/test','/test/:id'], (req,res) =>{
    fs.readdir('data', (err,files) =>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            fs.readFile('data/'+id, 'utf8', (err,data) =>{
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('test1', {topics:files, title:id, content:data});
            })
        }
        else{
            res.render('test1', {topics:files});
        }
    })
})

// app.get('/test/:id', (req,res) =>{
//     var id = req.params.id;
//     console.log(id);
//     fs.readdir('data', (err,files) =>{
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         fs.readFile('data/'+id, 'utf8', (err,data) =>{
//             if(err){
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             }
//             res.render('test1', {topics:files, title:id, content:data});
//         })
//     })
// })

app.post('/test', (req,res) =>{
    var list = ['Express', 'JavaScript', 'Nodejs', 'Npm', 'Supervisor'];
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, (err) =>{
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        // fs.readdir('data', (err,files) =>{
        //     if(err){
        //         console.log(err);
        //         res.status(500).send('Internal Server Error');
        //     }
        //     res.render('test1', {topics:files});
        // })
        res.redirect('/test/'+title);
    })
    // res.render('test1', {time:Date()});
})

app.listen(3000, () =>{
    console.log('Connected to port 3000!');
})
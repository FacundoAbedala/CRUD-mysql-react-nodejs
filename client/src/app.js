import './app.css';
import { useState } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


function App() {
  const [Canal, setCanal] = useState('');
  const [Frecuencia, setFrecuencia] = useState('');
  const [Modo, setModo] = useState('');
  const [Uso, setUso] = useState('');
  const [id, setId] = useState('');

  const [editar, setEditar] = useState(false);

  const [canalesLista, setLista] = useState([]);

  //1
  const add = () => {
    Axios.post('http://localhost:3001/create',{
      canal:Canal,
      frecuencia:Frecuencia,
      modo:Modo,
      uso:Uso
    }).then(()=>{
      getCanales();
      limpiarcampos();
      Swal.fire({
        title: '<strong>Canal agregado correctamente!!</strong>',
        html: '<i>Canal <strong>'+Canal+'</strong> agregado.</i>',
        icon: 'success',
        timer:1750
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo agregar el canal!',
        footer: JSON.parse(JSON.stringify(error)).message
      })
    });
  }

//4
const limpiarcampos = () => {
  setCanal('');
  setFrecuencia('');
  setModo('');
  setUso('');
  setEditar(false)
}

  //3
  const update = () => {
    Axios.put('http://localhost:3001/update',{
      id:id,
      canal:Canal,
      frecuencia:Frecuencia,
      modo:Modo,
      uso:Uso
    }).then(()=>{
      getCanales();
      limpiarcampos();
      Swal.fire({
        title: '<strong>Actualizacion exitosa!!</strong>',
        html: '<i>Canal <strong>'+Canal+'</strong> actualizado.</i>',
        icon: 'success',
        timer:1750
      })
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar el canal!',
        footer: JSON.parse(JSON.stringify(error)).message
      })
    });
  }

  //5
  const eliminarCanal = (val) => {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Una vez que se realice no se podra revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
            getCanales();
            limpiarcampos();
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El canal: <strong>'+Canal+'</strong> ha sido eliminado.',
              showConfirmButton: false,
              timer: 3000
          });
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pudo eliminar el canal!',
            footer: JSON.parse(JSON.stringify(error)).message
          })
        });
        }
      })
  }


const editarCanal = (val) => {
  setEditar(true);

  setCanal(val.canal);
  setFrecuencia(val.frecuencia);
  setModo(val.modo);
  setUso(val.uso);
  setId(val.id);
}

  //2
  const getCanales = () => {
    Axios.get('http://localhost:3001/canales').then((response)=>{
      setLista(response.data);
    });
  }

  getCanales();

  return (
    
    <div className="container">

    
      <div className="card text-center">
        <div className="card-header">
          CANALES ARMADA
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Canal:</span>
            <input type="text" value={Canal}
            onChange={(event)=>{
              setCanal(event.target.value)
            }}
            className="form-control"  placeholder="Nombre del Canal" aria-label="Nombre del Canal" aria-describedby="basic-addon1"/>
          </div>
  
  <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Frecuencia:</span>
            <input type="text" value={Frecuencia}
            onChange={(event)=>{
              setFrecuencia(event.target.value)
            }}
            className="form-control" placeholder="Ingrese la Frecuencia" aria-label="Ingrese la Frecuencia" aria-describedby="basic-addon1"/>
          </div>
          

          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Modo:</span>
            <input type="text" value={Modo}
            onChange={(event)=>{
              setModo(event.target.value)
            }}
            className="form-control" placeholder="Ingrese el Modo" aria-label="Ingrese el modo" aria-describedby="basic-addon1"/>
          </div>
          
          <div className="input-group mb-3">
            <span className="input-group-text"  id="basic-addon1">Uso:</span>
            <input type="text" value={Uso}
            onChange={(event)=>{
              setUso(event.target.value)
            }}
            className="form-control" placeholder="Ingrese el uso" aria-label="Ingrese el uso" aria-describedby="basic-addon1"/>
          </div>

        </div>
        <div className="card-footer text-muted">
          {
            editar? 
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-danger m-2' onClick={limpiarcampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Canal</th>
            <th scope="col">Frecuencia</th>
            <th scope="col">Modo</th>
            <th scope="col">Uso</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
          canalesLista.map((val,key)=> {
            return <tr key={val.id}>
                      <th>{val.id}</th>
                      <td>{val.canal}</td>
                      <td>{val.frecuencia}</td>
                      <td>{val.modo}</td>
                      <td>{val.uso}</td>
                      <td>
                      <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button"
                          onClick={()=>{
                            editarCanal(val);
                          }}
                          className="btn btn-primary m-1">Editar</button>
                        <button type="button" onClick={()=>{
                          eliminarCanal(val);
                        }} className="btn btn-danger m-1">Eliminar</button>
                      </div>
                      </td>
                    </tr>

          })
        }
    
          
        </tbody>
</table>

    </div>

  );
}

export default App;

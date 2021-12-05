import { Formik, Form, Field } from 'formik'
import { useState } from 'react';
import './App.css'


const styles = {
  etiqueta: {
    color: 'white'
  }
}

function App() {
  const [photos, setPhotos] = useState([])
  const open = (urls) => {
    window.open(urls)
  }
  console.log({ photos })

  return (
    <div>
      <header>

        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID -5MzyRJFiX1IEki6m_5uzw4QkrRolu_0VdNNdH54h10'
              }
            })
            const data = await response.json()
            const image = data.results[0].links.html;
            setPhotos(data.results)
            //llamar a la api de unplash
            // data.results.map(x=>{
            //   console.log(x.links.html)
            // })            
          }}
        >
          <Form>
            <label style={styles.etiqueta}>Buscador de imagenes </label>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>


          {photos.map(photo =>

            //si pinchas en la imagen te lleva a la url
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <p>{photo.description + ' -  ' + photo.alt_description}</p>
              <img src={photo.urls.regular} />
            </article>
          )}
        </div>


      </div>
    </div>
  );
}

export default App;

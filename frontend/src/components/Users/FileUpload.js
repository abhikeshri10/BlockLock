import React from 'react';
import { useState } from 'react';
import { create } from 'ipfs-http-client';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
const client = create('https://ipfs.infura.io:5001/api/v0');

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const [urlArr, setUrlArr] = useState([]);
  const [fileHash, setFileHash] = useState('');
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      console.log('Buffer data: ', Buffer(reader.result));
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const created = await client.add(file);

      const url = `https://ipfs.infura.io/ipfs/${created.path}`;
      setFileHash(created.path);
      console.log(url);
      setUrlArr((prev) => [...prev, url]);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Container>
        <div>
          <div class='container'>
            <div class='row gutters'>
              <div class='col-md-12 col-lg-12 col-xl-12'>
                <div class='card'>
                  <div class='card-body'>
                    <form onSubmit={handleSubmit}>
                      <div class='row form-row'>
                        <div class='col-12'>
                          <div class='form-group'>
                            <label> File Name </label>
                            <input
                              type='text'
                              // placeholder={Address}
                              class='form-control '
                              name='Address'
                            />
                          </div>
                        </div>
                        <div class='col-12'>
                          <div class='form-group'>
                            <label> File Description </label>
                            <input
                              type='text'
                              // placeholder={Address}
                              class='form-control '
                              name='Address'
                            />
                          </div>
                        </div>
                        <input
                          type='file'
                          name='data'
                          onChange={retrieveFile}
                        />
                        <button type='submit' className='btn'>
                          Upload file
                        </button>
                      </div>

                      <div className='display'>
                        <a src={urlArr}>{fileHash}</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FileUpload;

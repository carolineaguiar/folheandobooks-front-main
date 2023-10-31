const http = require('http');
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Fazer uma solicitação para a API
    try {
      const apiUrl = 'https://folheandobooksproducts.azurewebsites.net/api/Product/all-products';
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Montar a resposta HTML com os dados obtidos
      const productList = data.map((product) => `
        <div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="#">
            <img src="images/${product.imageURL}" class="img-fluid product-thumbnail">
            <h3 class="product-title">${product.name}</h3>
            <strong class="product-price">R$ ${product.price.toFixed(2)}</strong>
          </a>
        </div>
      `);

      const htmlResponse = `
        <!doctype html>
        <html lang="en">
        <head>
          <!-- ... Seu cabeçalho existente ... -->
        </head>
        <body>
          <!-- ... Seu conteúdo HTML existente ... -->
          <div class="untree_co-section product-section before-footer-section">
            <div class="container">
              <div class="row">
                ${productList.join('')}
              </div>
            </div>
          </div>
          <!-- ... Seu rodapé existente ... -->
        </body>
        </html>
      `;

      // Enviar a resposta HTML com os produtos
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlResponse);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      res.writeHead(500);
      res.end('Erro ao carregar produtos');
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

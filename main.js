const jsonServer = require('json-server');
const cors = require('cors');  // Import thư viện cors
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Cấu hình CORS
const corsOptions = {
  origin: '*', // Cho phép tất cả các nguồn (hoặc bạn có thể chỉ định nguồn cụ thể)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Các phương thức HTTP cho phép
  allowedHeaders: ['Content-Type', 'Authorization'] // Các headers tùy chỉnh
};

// Sử dụng middleware CORS trước các route
server.use(cors(corsOptions));

// Sử dụng các middleware mặc định (logger, static, cors và no-cache)
server.use(middlewares);

// Thêm các route tùy chỉnh trước router của JSON Server
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// Để xử lý POST, PUT và PATCH, bạn cần sử dụng body-parser
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updateAt = Date.now();
  }
  next();
});

// Sử dụng router mà không cần tiền tố /api
server.use(router);

// Cấu hình cổng cho server
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {  // Lắng nghe trên 0.0.0.0
  console.log(`JSON Server is running on port ${PORT}`);
});

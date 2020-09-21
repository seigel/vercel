// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}

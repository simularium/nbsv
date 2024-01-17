// "jupyter labextension build" will run webpack on its own and use the contents of this file as additional rules.  
// we will use file-loader here to handle svg assets properly

const rules = [
  {
    test: /\.svg$/,
    use: ['file-loader'],
  }
];

module.exports = {
    module: { rules },
}
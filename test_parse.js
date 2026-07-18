const fs = require('fs');
const { parse } = require('@babel/parser');

try {
  const code = fs.readFileSync('c:/Users/Mike/Desktop/wesmokefish/src/app/cards/page.tsx', 'utf8');
  parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  console.log('Parse successful!');
} catch (err) {
  console.error('Parse error:', err.message);
  console.error('At line:', err.loc.line, 'column:', err.loc.column);
}

export const downloadCSV = (expenses) => {
  if (!expenses.length) return;

  const headers = ['Title', 'Amount', 'Date'];
  const rows = expenses.map((e) => [
    e.title,
    e.amount.toFixed(2),
    new Date(e.date).toLocaleDateString('en-IN')
  ]);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2);
  rows.push(['Total', total, '']);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers, ...rows].map((r) => r.join(',')).join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'expenses.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

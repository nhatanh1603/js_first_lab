export function diemTrungBinh(ds) {
  if (ds.length === 0) return 0;
  const tongDiem = ds.reduce((tong, sv) => tong + sv.score, 0);
  return tongDiem / ds.length;
}

export function layTen(ds) {
  const danhSachTen = ds.map(sv => sv.name);
  return danhSachTen.toSorted((a, b) => a.localeCompare(b, 'vi'));
}

export function xepLoai(diem) {
  if (diem >= 8) return 'Giỏi';
  if (diem >= 6.5) return 'Khá';
  if (diem >= 5) return 'Trung bình';
  return 'Yếu';
}

export function nhomTheoLop(ds) {
  return ds.reduce((nhom, sv) => {
    const lop = sv.class;
    if (!nhom[lop]) {
      nhom[lop] = [];
    }
    nhom[lop].push(sv);
    return nhom;
  }, {});
}

export function top(ds, n) {
  const daSapXep = ds.toSorted((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.name.localeCompare(b.name, 'vi');
  });
  return daSapXep.slice(0, n);
}

const ds = [
  { name: 'Ánh', class: 'Web1', score: 8.5 },
  { name: 'Long', class: 'Web2', score: 6.5 },
  { name: 'Minh', class: 'Web1', score: 9 },
  { name: 'Bảo', class: 'Web2', score: 8 },
  { name: 'Linh', class: 'Web1', score: 4.5 }
];

function hienThi() {
  document.getElementById('bangSinhVien').innerHTML = ds.map(sv => `
    <tr>
      <td>${sv.name}</td>
      <td>${sv.class}</td>
      <td>${sv.score}</td>
      <td>${xepLoai(sv.score)}</td>
    </tr>
  `).join('');

  document.getElementById('kqDiemTB').textContent = diemTrungBinh(ds).toFixed(2);

  document.getElementById('kqTen').textContent = layTen(ds).join(', ');

  const nhom = nhomTheoLop(ds);
  document.getElementById('kqNhomLop').innerHTML = Object.keys(nhom).map(tenLop => {
    const danhSachTen = nhom[tenLop].map(sv => sv.name).join(', ');
    return `<p>- Lớp ${tenLop}: ${danhSachTen}</p>`;
  }).join('');

  const n = Number(document.getElementById('soN').value);
  document.getElementById('kqTop').innerHTML = top(ds, n).map(sv => `
    <li>${sv.name} (${sv.class}) - ${sv.score} điểm</li>
  `).join('');
}

document.getElementById('nutThem').onclick = () => {
  const name = document.getElementById('ten').value.trim();
  const tenLop = document.getElementById('lop').value.trim();
  const score = Number(document.getElementById('diem').value);

  if (!name || !tenLop) return;

  ds.push({ name: name, class: tenLop, score: score });
  hienThi();
};

document.getElementById('soN').oninput = hienThi;

hienThi();

import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, konfirmasiPassword } = formData;

    if (password !== konfirmasiPassword) {
      setErrorMessage('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), 
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || 'Terjadi kesalahan. Silakan coba lagi.');
      } else {
        setSuccessMessage('Pendaftaran berhasil! Silakan login.');
        setFormData({
          name: '',
          email: '',
          password: '',
          konfirmasiPassword: '',
        });
      }
    } catch (error) {
      setErrorMessage('Tidak dapat terhubung ke server. Coba lagi nanti.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center mt-16" 
         style={{ backgroundImage: "url('/images/bg.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#000000]">
          Bergabunglah dengan Econature
        </h2>
        <p className="text-center text-[#000000] mb-6">
          Dapatkan Dukungan, Pelajari Lebih Dalam Menuju Lingkungan Bersih
        </p>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-[#000000] mb-2 font-medium" htmlFor="name">
                Nama
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan nama"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label className="block text-[#000000] mb-2 font-medium" htmlFor="email">
                Alamat Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-[#000000] mb-2 font-medium" htmlFor="password">
                Kata Sandi
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan kata sandi"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-[#000000] mb-2 font-medium" htmlFor="konfirmasiPassword">
                Konfirmasi Kata Sandi
              </label>
              <input
                id="konfirmasiPassword"
                name="konfirmasiPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Masukkan ulang kata sandi"
                value={formData.konfirmasiPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#66BB6A] font-medium text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#000000] font-medium">Atau</p>
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50 transition duration-300 text-[#000000] font-medium">
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        <div className="mt-6 text-center space-y-2">
          <p className="text-[#000000] font-medium">
            Sudah punya akun?{" "}
            <span className="text-[#66BB6A] font-medium hover:text-green-600">
              <Link to="/masuk">Masuk Disini</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
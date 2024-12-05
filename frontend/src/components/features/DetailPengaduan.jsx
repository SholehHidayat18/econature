import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AsideDonation from '../Donation/asideDonation';
import PengaduanService from '../../service/PengaduanService';

const DetailPengaduan = () => {
    const { id } = useParams();
    const [pengaduanData, setPengaduanData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPengaduan = async () => {
            try {
                setIsLoading(true);
                const data = await PengaduanService.getPengaduanById(id);
                setPengaduanData(data);
            } catch (err) {
                setError('Gagal memuat data pengaduan.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPengaduan();
    }, [id]);

    if (isLoading) return <div className="text-center mt-12">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-12">{error}</div>;
    if (!pengaduanData) return <div className="text-center mt-12">Data tidak ditemukan.</div>;

    const {
        name,
        email,
        noHandphone,
        provinsi,
        status,
        description,
        formattedDate,
        jenisSampah,
        alamat,
        imagePath,
    } = pengaduanData;

    const handleToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src="/images/header.jpg"
                    alt="Header Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0">
                    <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                        <h1 className="text-6xl md:text-5xl text-white font-bold mb-4 ml-16">
                            Econature: Bersama untuk Bumi yang <br /> Lebih Lestari
                        </h1>
                        <nav className="text-white/90 text-2xl ml-16">
                            Beranda &raquo; Fitur &raquo; Detail Pengaduan
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto py-12 max-w-7xl px-4 mt-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {/* Image Section */}
                        <div className="mb-8 relative">
                            <img
                                src={`/images/pengaduan/${imagePath}` || '/images/placeholder.png'}
                                alt="Pengaduan"
                                className="w-full rounded-lg object-cover"
                            />
                            {/* Overlay untuk membuat gambar lebih gelap */}
                            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
                            <div className="absolute bottom-2 left-2 text-white text-sm flex items-center gap-2">
                                <i className="bi bi-person-circle text-[#689F38] ml-4"></i>
                                <span>{name}</span>
                                <i className="bi bi-calendar text-[#689F38] ml-2"></i>
                                <span>{formattedDate}</span>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold mb-6">
                            {description.split(" ").slice(0, 5).join(" ")}...
                        </h1>

                        {/* Detail Section */}
                        <div className="space-y-4 mb-6">
                            <div className="border rounded p-3 flex items-center">
                                <span className="text-gray-700 font-medium mr-2">Status Laporan:</span>
                                <div
                                    className={`ml-2 px-4 py-1 rounded ${status === 'Diproses'
                                        ? 'bg-blue-500'
                                        : status === 'Selesai'
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        } text-white`}
                                >
                                    {status}
                                </div>
                            </div>

                            <div className="border rounded p-3">
                                <div className="flex items-center">
                                    <i className="bi bi-person-circle text-gray-600 mr-2"></i>
                                    <span className="text-gray-700">Nama Lengkap : {name}</span>
                                </div>
                            </div>

                            <div className="border rounded p-3 flex items-center">
                                <i className="bi bi-envelope text-gray-600 mr-2"></i>
                                <span className="text-gray-700">Email: {email}</span>
                            </div>

                            <div className="border rounded p-3 flex items-center">
                                <i className="bi bi-phone text-gray-600 mr-2"></i>
                                <span className="text-gray-700">No. Handphone: {noHandphone}</span>
                            </div>

                            <div className="border rounded p-3 flex items-center">
                                <i className="bi bi-calendar text-gray-600 mr-2"></i>
                                <span className="text-gray-700">Hari dan Tanggal: {formattedDate}</span>
                            </div>

                            <div className="border rounded p-3 flex items-center">
                                <i className="bi bi-trash text-gray-600 mr-2"></i>
                                <span className="text-gray-700">Jenis Sampah: {jenisSampah}</span>
                            </div>
                            <div className="border rounded p-3 flex items-center">
                                <i className="bi bi-geo-alt text-gray-600 mr-2"></i>
                                <span className="text-gray-700">Alamat Lengkap: {provinsi}, {alamat}</span>
                            </div>

                            <div className="border rounded p-3">
                                <p className="text-gray-700">{description}</p>
                            </div>

                            <div className=" mx-auto bg-white">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold mb-6">Foto Kondisi Sampah :</h2>
                                    <div class="flex justify-center mb-8">
                                        <div class="relative">
                                            <img src={`/images/pengaduan/${imagePath}` || '/images/placeholder.png'}
                                                alt="Kondisi Sampah 1"
                                                class="w-full h-auto object-cover rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mb-8">
                                    <Link
                                        onClick={handleToTop}
                                        to="/DaftarPengaduan"
                                        className="bg-[#3B9E3F] hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300 uppercase text-sm font-semibold">
                                        Kembali Kedaftar Laporan Pengaduan
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <AsideDonation />
                </div>
                <div className="lg:col-span-2 mb-8">
                    <h2 className="text-2xl font-bold mb-6">Tinggalkan Komentar</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Nama Lengkap"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Subjek"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <textarea
                            rows="6"
                            placeholder="Komentar Anda"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                        </textarea>
                        <button
                            type="submit"
                            className="w-full bg-[#3B9E3F] text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            KIRIMKAN KOMENTAR ANDA
                        </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default DetailPengaduan;
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaGoogle, FaLinkedin, FaInstagram, FaYoutube, FaPinterest } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import DonationService from "../../service/DonationService";
import AsideDonatin from '../Donation/asideDonation';


const DetailDonasi = () => {
    const { id } = useParams();
    const [donationData, setDonationData] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Untuk loading state
    const [error, setError] = useState(null); // Untuk menangani error

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                setIsLoading(true);
                const donations = await DonationService.getDonationById(id); // Panggil service API
                setDonationData(donations);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonations();
    }, [id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!donationData) {
        return <div>Donasi tidak ditemukan.</div>;
    }

    const { title, description, target, message, username, imagePath, payments } = donationData;

    // Hitung total donasi (asumsi donationCount * rata-rata donasi)
    const totalDonations = payments.reduce((total, payment) => total + payment.total, 0);
    const donationProgress = (totalDonations / target) * 100;

    return (
        <div className="min-h-screen bg-white ">
            <div className="relative h-96 overflow-hidden mb-8">
                <img
                    src="/images/header.jpg"
                    alt="Waterfall"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0">
                    <div className="container mx-auto px-6 h-full flex flex-col justify-center">
                        <h1 className="text-6xl md:text-5xl text-white font-bold mb-4 ml-16">
                            Econature: Bersama untuk Bumi yang <br /> Lebih Lestari
                        </h1>
                        <nav className="text-white/90 text-2xl ml-16">
                            Beranda &raquo; Fitur &raquo; Donasi &raquo; Lebih Lanjut
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container mx-auto py-12 max-w-7xl px-4">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="mb-12">
                            <img
                                src={imagePath || "/images/d4.png"} // Tampilkan gambar default jika null
                                alt={title}
                                className="w-full rounded-lg mb-6"
                            />

                            <div className="max-w-5xl mx-auto p-4 bg-gray-50 rounded-lg shadow mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <div className="h-2.5 w-full bg-gray-200 rounded-full mb-2">
                                            <div
                                                className="h-2.5 bg-[#3B9E3F] rounded-full"
                                                style={{ width: `${donationProgress}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <span className="font-semibold text-center">
                                                    <div>{Math.round(donationProgress)}%</div>
                                                    <div className="text-gray-500 text-sm ml-1">Didanai</div>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    <div>Rp {totalDonations.toLocaleString()}</div>
                                                    <div className="text-gray-500 text-sm ml-1">Terkumpul</div>
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-semibold">
                                                    <div>Rp {target.toLocaleString()}</div>
                                                    <div className="text-gray-500 text-sm ml-1">Diperlukan</div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-12 w-px bg-gray-200"></div>
                                    <div className="flex items-center gap-2">
                                        {/* Tombol donasi */}
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                            5rb
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                            10rb
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                            25rb
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                                            50rb
                                        </button>
                                        <button className="px-6 py-2 bg-[#3B9E3F] text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                                            <a href="/PembayaranDonasi">DONASI</a>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-3">Donasi Untuk {title}</h2>
                            <p className="text-gray-600 leading-relaxed mb-2">{description}</p>

                            <div className="bg-gray-50 p-6 rounded-lg mb-7 mt-8">
                                <div className="flex items-center gap-4">
                                    <img
                                        src="/images/r1.png"
                                        alt="Author"
                                        className="w-100 h-100 rounded-full object-cover"
                                    />
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">{username}</h2>
                                        <p className="text-gray-600">{message}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bagikan */}
                            <div className="flex items-center space-x-2 mt-8">
                                <p className="text-gray-600 font-semibold">Bagikan:</p>
                                <Link to="#" className="text-[#3B5998] hover:text-gray-600">
                                    <FaFacebook size={24} />
                                </Link>
                                <Link to="#" className="text-[#00ACED] hover:text-gray-600">
                                    <FaTwitter size={24} />
                                </Link>
                                <Link to="#" className="text-[#DC4A38] hover:text-gray-600">
                                    <FaGoogle size={24} />
                                </Link>
                                <Link to="#" className="text-[#0077B5] hover:text-gray-600">
                                    <FaLinkedin size={24} />
                                </Link>
                                <Link to="#" className="text-[#D93175] hover:text-gray-600">
                                    <FaInstagram size={24} />
                                </Link>
                                <Link to="#" className="text-[#FE0002] hover:text-gray-600">
                                    <FaYoutube size={24} />
                                </Link>
                                <Link to="#" className="text-[#BD081B] hover:text-gray-600">
                                    <FaPinterest size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Info lainnya */}
                    <AsideDonatin />
                </div>
                <div className="lg:col-span-2 mb-8 mt-8">
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

export default DetailDonasi;
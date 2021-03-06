import NavBar from './NavBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateBrand = () => {
  const [brand, setBrand] = useState([]);
  const params = useParams();
  const [name, setName] = useState('');
  const [logo, setLogo] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState(1);
  const [archived, setArchived] = useState(1);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getBrand();
  }, []);

  const formData = new FormData();
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleLogo = (e) => {
    setLogo(e.target.files[0]);
  };

  const getBrand = () => {
    axios
      .get(`http://localhost:8000/brands/id/${params.id}`)
      .then((response) => {
        setBrand(response.data);
        setName(response.data.name);
        setLogo(response.data.logo);
        setImage(response.data.image);
        setDescription(response.data.description);
        setLink(response.data.link);
        setPrice(response.data.price);
        setArchived(response.data.archived);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('name', name);
    if (typeof logo !== 'string') {
      formData.append('images', logo);
    } else {
      formData.append('logo', logo);
    }
    if (typeof image !== 'string') {
      formData.append('images', image);
    } else {
      formData.append('image', image);
    }
    formData.append('description', description);
    formData.append('link', link);
    formData.append('price', price);
    formData.append('archived', archived);
    axios
      .put(`http://localhost:8000/brands/${params.id}`, formData, config)
      .then(({ data }) => {
        if (data.error) setError(data.error);
      })
      .then(() =>
        setMessage(`La marque ${brand.name} a ??t?? mise ?? jour avec succ??s !`)
      );
  };

  return (
    <section className="admin items-stretch relative">
      <NavBar />
      <div className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 px-5 py-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              {error && <p className="register-error">{error}</p>}
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <h3 className="mb-5 text-lg font-medium leading-6 text-gray-900">
                      Mettre ?? jour {brand.name}
                    </h3>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium font-bold text-gray-700"
                    >
                      Nom de la Marque
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={name}
                      className="mt-3 border border-gray-300 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="logo"
                        className="block text-sm font-medium font-bold text-gray-700"
                      >
                        Logo
                      </label>
                      <div className="mt-5 rounded-md shadow-sm">
                        {brand.logo && (
                          <img src={brand.logo} alt={brand.name} />
                        )}
                        <input
                          type="file"
                          name="logo"
                          id="logo"
                          className="mt-5 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          onChange={handleLogo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium font-bold text-gray-700"
                      >
                        Image
                      </label>
                      <div className="mt-5 rounded-md shadow-sm">
                        {brand.image && (
                          <img src={brand.image} alt={brand.image} />
                        )}
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="mt-5 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium font-bold text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 px-2 py-2 rounded-md"
                        placeholder="Pr??sentation de la marque"
                        defaultValue={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Lien de la boutique
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="url"
                          name="company-website"
                          id="company-website"
                          defaultValue={link}
                          className="mt-3 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full sm:text-sm border border-gray-300 px-2 py-2 rounded-md"
                          placeholder="http://www.monsiteweb.fr"
                          onChange={(e) => setLink(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Prix
                    </label>
                    <select
                      id="price"
                      name="price"
                      value={price}
                      className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPrice(e.target.value)}
                    >
                      <option value="1">$</option>
                      <option value="2">$$</option>
                      <option value="3">$$$</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Afficher
                    </label>
                    <select
                      id="archived"
                      name="archived"
                      value={archived}
                      className="mt-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setArchived(e.target.value)}
                    >
                      <option value="0">Oui</option>
                      <option value="1">Non</option>
                    </select>
                  </div>
                </div>
                <div className="px-5 py-5 bg-white text-right sm:px-6">
                  {error && (
                    <div
                      className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700"
                      role="alert"
                    >
                      <svg
                        className="w-5 h-5 inline mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div>
                        <span className="font-medium">{error}</span>
                      </div>
                    </div>
                  )}
                  {message && (
                    <div
                      className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
                      role="alert"
                    >
                      <svg
                        className="w-5 h-5 inline mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div>
                        <span className="font-medium">{message}</span>
                      </div>
                    </div>
                  )}
                  <button
                    type="submit"
                    value="Send"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Mettre ?? jour
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default UpdateBrand;

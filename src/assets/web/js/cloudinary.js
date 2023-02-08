var myWidget = cloudinary.createUploadWidget({
    // cloudName: 'dccnoybrd',
    // uploadPreset: 'baldoria_lounge'
    cloudName: 'duzpck4ys',
    uploadPreset: 'ml_default'
  }, (error, result) => { }
)

document.getElementById("upload_widget").addEventListener("click", function() { myWidget.open(); }, false);

window.ml = cloudinary.createMediaLibrary(
    {
        // cloud_name: 'ligthsoft',
        // api_key: '887655319531388',
        // username: 'renattofaridper@gmail.com',
        cloud_name: 'duzpck4ys',
        api_key: '174384627724166',
        username: 'colegioperegrinochiclayo@gmail.com',
        button_class: 'inline-flex items-center px-4 py-2 bg-red-400 border border-transparent rounded-md font-semibold text-xs text-black uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition',
        button_caption: 'Administrador de recursos',
    },
    {
        insertHandler: function (data) {
            data.assets.forEach(asset => {
            console.log("Inserted asset:",
                JSON.stringify(asset, null, 2))
            })
        }
    },
    document.getElementById("open-btn")
);
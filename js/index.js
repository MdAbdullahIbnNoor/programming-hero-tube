let tem_id;
const vdoTabShow = async () => {
    const responsive = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const data = await responsive.json();

    showTabs(data.data);
}

const showTabs = vdo => {
    const tabContainer = document.getElementById('tab-container');

    handleTabButton(1000);

    vdo.forEach(tabs => {
        // console.log(tabs);
        const div = document.createElement('div');

        div.innerHTML = `
            <button id="${tabs.category}" class="btn btn-sm md:btn-md font-normal md:font-medium focus:bg-red-600 focus:text-white" onclick = "handleTabButton(${tabs.category_id})">${tabs.category}</button>
        `
        tabContainer.appendChild(div);
    });
}



const handleTabButton = async (id) => {
    // console.log(id);
    tem_id = id;
    const responsive = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);

    const data = await responsive.json();

    showVdoPage(data.data);

    const sortButton = document.getElementById('sort-btn');
    sortButton.classList.remove('bg-red-600');
    sortButton.classList.remove('text-white');
}


const handleSortByView = async () => {

    const responsive = await fetch(`https://openapi.programming-hero.com/api/videos/category/${tem_id}`);

    const data = await responsive.json();

    showVdoPage(data.data.sort(compareViews));

    const sortButton = document.getElementById('sort-btn');
    sortButton.classList.add('bg-red-600');
    sortButton.classList.add('text-white');
};


const showVdoPage = (info) => {

    // console.log(info);
    const vdoContainer = document.getElementById('vdo-container');
    const mainContainer = document.getElementById('main-contianer');

    vdoContainer.innerHTML = '';
    mainContainer.innerHTML = '';

    if (info.length === 0) {


        const div = document.createElement('div');

        div.innerHTML = `
            <div class="container mx-auto justify-center my-44">
                <img src="./images/Icon.png" class="w-2/5 md:w-1/12 mx-auto">
                <h1 class="mt-6 text-2xl lg:text-5xl md:text-3xl w-full lg:w-1/3 mx-auto font-extrabold text-black text-center">Oops!! Sorry, There is no content here</h1>
            </div>
        `
        mainContainer.appendChild(div);

    }
    else {
        info.forEach(vdo => {
            const div = document.createElement('div');

            div.innerHTML = `
            <div class="overflow-hidden bg-white rounded">
                    <img src="${vdo.thumbnail}"
                    class="object-cover w-full h-52 lg:h-52 md:h-40 rounded"
                    alt />
                    <div class="py-3 relative">
                        ${vdo.others && vdo.others.posted_date ? `
                        <p class="bottom-5 right-3 mb-3 text-end text-xs font-semibold text-white bg-black max-w-36 py-1 px-2 rounded-lg absolute">
                            ${timeCalculation(vdo.others.posted_date)}
                        </p>` : ''
                }
                    </div>

                <div
                    class="flex justify-between items-start gap-3">
                    <div class="avatar">
                        <div class="w-12 rounded-full">
                            <img
                                src="${vdo?.authors[0]?.profile_picture}" />
                        </div>
                    </div>

                    <div class="flex-1">
                        <a href="/" aria-label="Article"
                            class="inline-block mb-3 text-black transition-colors duration-200 hover:text-red-600">
                            <p
                                class="text-xl font-bold leading-5">${vdo.title}</p>
                        </a>
                        <div
                            class="mb-2 flex items-center gap-1">
                            <p class=" text-gray-500">${vdo?.authors[0]?.profile_name}</p>
                        

                           ${vdo.authors[0].verified ? `
                           <img src="./images/verified.png" class="w-4">
                           ` : ''}
                        </div>
                    </div>

                </div>

                <p class="text-gray-700 ml-16">${vdo.others.views} views</p>
            </div>
        </div>          
        `
            vdoContainer.appendChild(div);
        })
    }
}

vdoTabShow();


function compareViews(a, b) {
    const viewsA = parseFloat(a.others.views.replace("K", "")) || 0;
    const viewsB = parseFloat(b.others.views.replace("K", "")) || 0;

    return viewsB - viewsA;
}

const timeCalculation = (sec) => {
    const time_sec = sec;

    const time_hour = Math.floor(time_sec / 3600);

    const time_min = Math.floor((time_sec - 3600 * time_hour) / 60);

    return (`${time_hour}hrs ${time_min} min ago`);
}

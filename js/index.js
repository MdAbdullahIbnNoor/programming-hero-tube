
const vdoTabShow = async () => {
    const responsive = await fetch("https://openapi.programming-hero.com/api/videos/categories");

    const data = await responsive.json();

    showTabs(data.data);
}

const showTabs = vdo => {
    const tabContainer = document.getElementById('tab-container');

    let count = 0;

    handleTabButton(1000);
    vdo.forEach(tabs => {
        // console.log(tabs);
        const div = document.createElement('div');
        
        count++;

        div.innerHTML = `
            <button id="${tabs.category}" class="btn font-medium focus:bg-red-600 focus:text-white" onclick = "handleTabButton(${tabs.category_id}); makebtnActive(this);">${tabs.category}</button>
        `
        tabContainer.appendChild(div);

    });

}

const makebtnActive = (element) =>{
    element.classList.add('active');
}

const handleTabButton = async (id) => {
    console.log(id);
    const responsive = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);

    const data = await responsive.json();

    showVdoPage(data.data);
}


const showVdoPage = (info) => {

    console.log(info);
    const vdoContainer = document.getElementById('vdo-container');
    const mainContainer = document.getElementById('main-contianer');

    vdoContainer.innerHTML = '';
    mainContainer.innerHTML = '';

    if (info.length === 0) {
        
        
        const div = document.createElement('div');

        div.innerHTML = `
            <div class="container mx-auto justify-center my-44">
                <img src="./images/Icon.png" class="w-1/12 mx-auto">
                <h1 class="mt-6 text-5xl w-1/3 mx-auto font-extrabold text-black text-center">Oops!! Sorry, There is no content here</h1>
            </div>
        `
        mainContainer.appendChild(div);

    }
    else {
        info.forEach(vdo => {
            const div = document.createElement('div');

            div.innerHTML = `
        <div class="overflow-hidden bg-white rounded">
        <a href="/" aria-label="Article"><img
        src="${vdo.thumbnail}"
        class="object-cover w-full h-48 rounded relative"
        alt /></a>
            <div class="py-5">
            ${vdo.others && vdo.others.posted_date ? `
                <p class="-mt-12 ml-60 mb-10 text-xs font-semibold text-white bg-black w-28 py-1 px-2 rounded-lg absolute">
                    ${timeCalculation(vdo.others.posted_date)}
                </p>` : ''
                }

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
                            class="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
                            <p
                                class="text-xl font-bold leading-5">${vdo.title}</p>
                        </a>
                        <div
                            class="mb-2 flex items-center gap-1">
                            <p class=" text-gray-500">${vdo?.authors[0]?.profile_name}</p>
                            <img src="./images/verified.png"
                                class="w-4">
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

// handleSortByView = () {

// }

const timeCalculation = (sec) => {
    const time_sec = sec;

    const time_hour = Math.floor(time_sec / 3600);

    const time_min = Math.floor((time_sec - 3600 * time_hour) / 60);

    return (`${time_hour}hrs ${time_min} min ago`);
}


// timeCalculation(13885);
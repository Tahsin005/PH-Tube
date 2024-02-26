const handleSortByViews = () => {
  fetch(`https://openapi.programming-hero.com/api/videos/category/${"1000"}`)
    .then((response) => response.json())
    .then((data) => {
      const videos = data.data;
      console.log(videos);

      videos.sort((a, b) => {
        const viewA = parseInt(a.others.views);
        const viewB = parseInt(b.others.views);
        return viewB - viewA;
      });

      console.log(videos);

      const cardContainer = document.getElementById("card-container");
      cardContainer.innerHTML = "";

      videos?.map((video) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card bg-base-100 shadow-xl max-h-80">
            <figure>
                <img src=${video?.thumbnail} />
            </figure>
        <div class="card-body">
            <div class="card-footer flex justify-between ">
                <div class="flex gap-x-8">
                    <div>
                        <div class="avatar online">
                                <div class="w-14 rounded-full">
                                    <img src=${video.authors[0].profile_picture} />
                                </div>
                        </div>
                    </div>
                    <h2 class="card-title"> ${video?.title} </h2>
                
                </div>
                    
            </div>
  
            <div class="flex text-center gap-2">
                <h6>${video.authors[0].profile_name}</h6>
                <small>${video.authors[0].verified? 
                    `<div>
                        <img src="./fi_10629607.png" alt="">
                    </div>`: ""}
                </small>
            </div>
        
            <p>
                ${video.others.views} views
            </p>
            <p>
            ${convertTime(video.others.posted_date)} 
            </p>
      </div>
    </div>`;

        cardContainer.appendChild(div);
      });
    });
};

const convertTime = (time) => {
	const timeNumber = parseInt(time);
	let [years, months, days, hours, minutes, seconds] = [0, 0, 0, 0, 0, 0];
	if (timeNumber > 0) seconds = timeNumber;
	if (seconds >= 60) {
		minutes = Math.floor(seconds / 60);
		seconds %= 60;
	}
	if (minutes >= 60) {
		hours = Math.floor(minutes / 60);
		minutes %= 60;
	}
	if (hours >= 24) {
		days = Math.floor(hours / 24);
		hours %= 24;
	}
	if (days >= 30) {
		months = Math.floor(days / 30);
		days %= 30;
	}
	if (months >= 12) {
		years = Math.floor(months / 12);
		months %= 12;
	}
	const arr = [];
	if (years) arr.push(`${years} years`);
	if (months) arr.push(`${months} months`);
	if (days) arr.push(`${days} days`);
	if (hours) arr.push(`${hours} hours`);
	if (minutes) arr.push(`${minutes} minutes`);
	if (seconds) arr.push(`${seconds} seconds`);
	return arr.join(" ");
};
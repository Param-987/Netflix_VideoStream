export function getVideoDuration(videoLink) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');

        video.addEventListener('loadedmetadata', () => {
            const duration = Math.floor(video.duration);
            resolve(duration);
        });

        video.addEventListener('error', () => {
            reject('Failed to load video');
        });

        video.src = videoLink;
    });
}

const getTwoDigit = num => num > 10 ? `${num}` : `0${num}`;

export function getDurationFormat(limit) {
    const hour = Math.floor(limit / 3600)
    const min = Math.floor(limit % 3600 / 60)
    const sec = Math.floor(limit % 60)
    return `${hour ? `${getTwoDigit(hour)} hour` : ""}  ${min ? `${getTwoDigit(min)} min` : ""} ${sec ? `${getTwoDigit(sec)} sec` : ""}`
}

export const logicalSort = (MovieById)=>(a, b) => {
    const matchA = MovieById[a].title.match(/S(\d+) E(\d+)/);
    const matchB = MovieById[b].title.match(/S(\d+) E(\d+)/);
  
    if (matchA && matchB) {
      const [, seasonA, episodeA] = matchA;
      const [, seasonB, episodeB] = matchB;
  
      if (parseInt(seasonA) === parseInt(seasonB)) {
        return parseInt(episodeA) - parseInt(episodeB);
      }
  
      return parseInt(seasonA) - parseInt(seasonB);
    }
    return a.title.localeCompare(b.title);
};

export const getArraySorted = (arr,MovieById)=>{

    const res = arr.sort(logicalSort(MovieById))
    return res;
}

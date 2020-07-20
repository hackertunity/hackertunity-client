const _getNode = (parent) => (tagName) =>
  parent.getElementsByTagName(tagName)[0];

const renderJobPosting = (posting) => {
  const { link, pubDate, imgSrc, companyName, jobTitle } = posting;

  const ul = document.getElementById('job-posting-list');
  const li = document.createElement('li');
  const img = document.createElement('img');
  const hr = document.createElement('hr');
  img.setAttribute('src', imgSrc);
  img.setAttribute('alt', '');
  const div = document.createElement('div');
  const a = document.createElement('a');
  a.setAttribute('href', link);
  a.innerText = jobTitle;
  const pEmployer = document.createElement('p');
  pEmployer.innerText = 'Employer: ' + companyName;
  const pDate = document.createElement('p');
  pDate.innerText = 'Posted: ' + new Date(pubDate).toLocaleDateString();

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('job-post');
  const imgDiv = document.createElement('div');
  imgDiv.append(img);
  innerDiv.append(imgDiv, div);

  div.append(a, pEmployer, pDate);
  li.append(hr, innerDiv);
  ul.append(li);
};

const getJobPostingData = (j) => {
  const getNode = _getNode(j);
  const link = getNode('link').innerHTML;
  const title = getNode('title').innerHTML;
  const pubDate = getNode('pubDate').innerHTML;
  const mediaContent = getNode('media:content');
  const imgSrc = mediaContent ? mediaContent.getAttribute('url') : '';
  const [companyName, jobTitle] = title.split(': ');

  renderJobPosting({
    link,
    pubDate,
    imgSrc,
    companyName,
    jobTitle
  });
};

const reqListener = (res) => {
  const tags = res.target.responseXML.children[0].children[0].children;
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].tagName === 'item') getJobPostingData(tags[i]);
  }
};

const renderJobFeed = () => {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', 'https://weworkremotely.com/remote-jobs.rss');
  oReq.send();
};

window.addEventListener('DOMContentLoaded', renderJobFeed);

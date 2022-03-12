
// emp Zikui Cai 
let author_tags = document.getElementsByTagName("author");
for (let i = 0; i < author_tags.length; i++) {
    author_tags[i].innerHTML = author_tags[i].textContent.replace('Zikui Cai', '<u>Zikui Cai</u>')
}
// window.alert(author_tags[0].textContent)

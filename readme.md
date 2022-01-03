# myweb-task-assist

My Web Task Assist Version: 4  

Agile Development  

## Version
V1: https://github.com/rejiejay/myweb-task-assist/tree/task-assist-v1
V2: https://github.com/rejiejay/myweb-task-assist/tree/react
V3: https://github.com/rejiejay/website-station-system-version-fives

## sqlLite
CREATE TABLE administrative_aptitude_essay_helper ( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL, timestamp BIGINT NOT NULL, category TEXT NOT NULL, images TEXT )

ALTER TABLE administrative_aptitude_essay_helper ADD COLUMN images Text;

## Construct
cnpm install -d  

git config --add remote.origin.proxy ""
git config --unset http.proxy
git config http.postBuffer 524288000

import Faker from 'faker';

let MemoryStore = [];

for(var i = 0; i < 10; i++) {
  MemoryStore.push(buildFakeMemories())
}

function buildFakeMemories() {
  return ({
    id: Faker.random.uuid(),
    title: Faker.lorem.words(),
    memory_date: Faker.date.past().toDateString(),
    memory_desc: Faker.lorem.sentences(),
    media_url: "https://via.placeholder.com/150",
    relative_id: Faker.random.number(),
    tag_id: Faker.random.number(),
    comment_id: Faker.random.number(),
  })
}

export default MemoryStore;
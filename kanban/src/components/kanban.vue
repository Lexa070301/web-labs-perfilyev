<template>
  <div class="kanban container">
    <h1 class="main__title">{{ title }}</h1>
    <button class="add-card" @click="add_card">

    </button>
    <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2 class="column-title">
          {{ stage + ' (' + count[stage] + ')'}}
        </h2>
      </div>
      <div v-for="block in blocks" :slot="block.id" :key="block.id">
        <div class="task-number">
          <strong>Задача №</strong> {{ block.number }}
        </div>
        <div class="description">
          {{ block.description }}
        </div>
        <div v-if="(block.status=='В работе')" class="start_date">
          Дата начала:
          <br>
          {{ block.start_date = new Date() | formatDate}}
        </div>
        <div v-if="(block.status=='Готово')" class="end_date">
          Дата начала:
          <br>
          <span>{{ block.start_date | formatDate}}</span>
          Времени потрачено:
          <br>
          {{ new Date() - block.start_date | formatTime }}
        </div>
        <div class="name" v-if="(block.status=='В работе') || (block.status=='Готово')">
          <span>Имя ответственного:</span>
          <br>
          {{ block.name }}
        </div>
        <button class="btn close" @click="delete_card(block)"></button>
        <button class="btn edit"></button>
        <button class="btn confirm"></button>
      </div>
    </kanban-board>
  </div>
</template>

<script>
    export default {
        name: 'kanban',
        data() {
            return {
                title: 'Канбан',
                stages: ['План', 'В работе', 'Готово'],
                blocks: [],
                count: {'План': 0, 'В работе': 0, 'Готово': 0}
            }
        },
        methods: {
            updateBlock(id, status) {
                this.blocks.find(b => b.id === Number(id)).status = status;
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
                // console.log(this.blocks[0].start_date.split(',')[0])
                // console.log(Date.parse(this.blocks[0].start_date.split(',')[0]))
            },
            delete_card(block) {
                block.status = 'deleted';
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            },
            add_card() {
                for (var i = 0; i <= this.blocks.length - 1; i++) {

                }
                this.blocks.push({
                    id: this.blocks.length + 1,
                    number: this.blocks.length + 1,
                    status: 'План',
                    description: 'Описание',
                    start_date: new Date,
                    end_date: new Date,
                    name: 'Alexey',
                });
                this.count['План'] = 0;
                this.count['В работе'] = 0;
                this.count['Готово'] = 0;
                for (var i = 0; i <= this.blocks.length - 1; i++) {
                    if (this.blocks[i].status === 'План')
                        this.count['План']++;
                    if (this.blocks[i].status === 'В работе')
                        this.count['В работе']++;
                    if (this.blocks[i].status === 'Готово')
                        this.count['Готово']++;
                }
            }
        }
    }
</script>

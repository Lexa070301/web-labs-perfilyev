<template>
  <div class="kanban">
    <h1 class="main__title">{{ title }}</h1>
    <kanban-board :stages="stages" :blocks="blocks" @update-block="updateBlock">
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2 class="column-title">
          {{ stage + ' (' + count[stage] + ')'}}
        </h2>
      </div>
      <div v-for="block in blocks" :slot="block.id" :key="block.id">
        <div class="task-number">
          <strong>Задача №</strong> {{ block.id }}
        </div>
        <div class="description">
          {{ block.description }}
        </div>
        <div v-if="(block.status=='В работе')" class="start_date">
          Дата начала:
          <br>
          {{ block.start_date = new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric',
          hour12: false
          }).format(new Date) }}
        </div>
        <div v-if="(block.status=='Готово')" class="end_date">
          Дата начала:
          <br>
          <span>{{ block.start_date }}</span>
          Дата завершения:
          <br>
          {{ new Intl.DateTimeFormat('ru-RU', {
          year: 'numeric', month: 'numeric', day: 'numeric',
          hour: 'numeric', minute: 'numeric', second: 'numeric',
          hour12: false
          }).format(new Date) }}
        </div>
        <div class="name" v-if="(block.status=='В работе') || (block.status=='Готово')">
          <span>Имя ответственного:</span>
          <br>
          {{ block.name }}
        </div>
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
                blocks: [
                    {
                        id: 1,
                        status: 'План',
                        description: 'Welcome',
                        start_date: new Intl.DateTimeFormat('ru-RU', {
                            year: 'numeric', month: 'numeric', day: 'numeric',
                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                            hour12: false
                        }).format(new Date),
                        end_date: new Intl.DateTimeFormat('ru-RU', {
                            year: 'numeric', month: 'numeric', day: 'numeric',
                            hour: 'numeric', minute: 'numeric', second: 'numeric',
                            hour12: false
                        }).format(new Date),
                        name: 'Alexey'
                    }
                ],
                count: {'План': 1, 'В работе': 0, 'Готово': 0}
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

            },
            change_date(block) {
                console.log('test')
                block.start_date = new Intl.DateTimeFormat('ru-RU', {
                    year: 'numeric', month: 'numeric', day: 'numeric',
                    hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: false
                }).format(new Date);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

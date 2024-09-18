<template>
  <div class="h-screen" @contextmenu="onRightClick">
    <Menubar :model="menubarItems">
      <template #start>
        <i class="pi pi-apple px-2"></i>
      </template>
      <template #end>
        <i class="pi pi-video px-2"></i>
        <i class="pi pi-wifi px-2"></i>
        <i class="pi pi-volume-up px-2"></i>
        <span class="px-2">Fri 13:07</span>
        <i class="pi pi-search px-2"></i>
        <i class="pi pi-bars px-2"></i>
      </template>
    </Menubar>

    <div data-app="selection-container" class="h-full"></div>

    <Dock :model="dockItems" class="mb-3">
      <template #item="{ item }">
        <a
          v-tooltip.top="item.label"
          href="#"
          class="p-dock-item-link"
          @click="onDockItemClick($event, item)"
        >
          <img :alt="item.label" :src="item.icon" style="width: 100%" />
        </a>
      </template>
    </Dock>

    <ContextMenu ref="menu" :model="contextItems" @hide="selectedId = null"></ContextMenu>

    <Dialog
      v-model:visible="displayTerminal"
      header="Terminal"
      :breakpoints="{ '960px': '90vw' }"
      :style="{ width: '40vw' }"
      :maximizable="true"
    >
      <Terminal welcome-message="Welcome to PrimeVue(cmd: 'date')" prompt="primevue $" />
    </Dialog>

    <div data-app="selection"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import TerminalService from 'primevue/terminalservice'
import { ref } from 'vue'

const selectedId = ref(null)
const menu = ref()
const displayTerminal = ref(false)

const dockItems = ref([
  {
    label: 'Finder',
    icon: 'https://primefaces.org/cdn/primevue/images/dock/finder.svg',
  },
  {
    label: 'Terminal',
    icon: 'https://primefaces.org/cdn/primevue//images/dock/terminal.svg',
    command: () => {
      displayTerminal.value = true
    },
  },

  {
    label: 'App Store',
    icon: 'https://primefaces.org/cdn/primevue/images/dock/appstore.svg',
  },

  {
    label: 'Photos',
    icon: 'https://primefaces.org/cdn/primevue/images/dock/photos.svg',
  },
  {
    label: 'Trash',
    icon: 'https://primefaces.org/cdn/primevue/images/dock/trash.png',
  },
])

const contextItems = ref([
  { label: 'Copy', icon: 'pi pi-copy' },
  { label: 'Rename', icon: 'pi pi-file-edit' },
  // {
  //   label: 'Open f12',
  //   icon: 'pi pi-file-edit',
  //   command: () => {
  //     simulateKeyPress(123)
  //   },
  // },
])

const menubarItems = ref([
  {
    label: 'Finder',
    class: 'menubar-root',
  },
  {
    label: 'File',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-plus',
        items: [
          {
            label: 'Bookmark',
            icon: 'pi pi-fw pi-bookmark',
          },
          {
            label: 'Video',
            icon: 'pi pi-fw pi-video',
          },
        ],
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-trash',
      },
      {
        separator: true,
      },
      {
        label: 'Export',
        icon: 'pi pi-fw pi-external-link',
      },
    ],
  },
  {
    label: 'Edit',
    items: [
      {
        label: 'Left',
        icon: 'pi pi-fw pi-align-left',
      },
      {
        label: 'Right',
        icon: 'pi pi-fw pi-align-right',
      },
      {
        label: 'Center',
        icon: 'pi pi-fw pi-align-center',
      },
      {
        label: 'Justify',
        icon: 'pi pi-fw pi-align-justify',
      },
    ],
  },
  {
    label: 'Users',
    items: [
      {
        label: 'New',
        icon: 'pi pi-fw pi-user-plus',
      },
      {
        label: 'Delete',
        icon: 'pi pi-fw pi-user-minus',
      },
      {
        label: 'Search',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Filter',
            icon: 'pi pi-fw pi-filter',
            items: [
              {
                label: 'Print',
                icon: 'pi pi-fw pi-print',
              },
            ],
          },
          {
            icon: 'pi pi-fw pi-bars',
            label: 'List',
          },
        ],
      },
    ],
  },
  {
    label: 'Events',
    items: [
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {
            label: 'Save',
            icon: 'pi pi-fw pi-calendar-plus',
          },
          {
            label: 'Delete',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
      {
        label: 'Archive',
        icon: 'pi pi-fw pi-calendar-times',
        items: [
          {
            label: 'Remove',
            icon: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
    ],
  },
  {
    label: 'Toggle Dark Mode',
    command: () => {
      executeDarkModeToggle()
    },
  },
])

function onDockItemClick(event: any, item: any) {
  if (item.command) {
    item.command()
  }

  event.preventDefault()
}

function onRightClick(event: any, id: any) {
  selectedId.value = id
  menu.value.show(event)
}

function simulateKeyPress(keyCode: number) {
  const event = new KeyboardEvent('keydown', {
    key: String.fromCharCode(keyCode),
    keyCode: keyCode,
    code: `Key${String.fromCharCode(keyCode)}`,
    which: keyCode,
    bubbles: true,
    cancelable: false,
  })
  document.dispatchEvent(event)
}
function executeDarkModeToggle() {
  document.documentElement.classList.toggle('app-dark')
}

function commandHandler(text: string) {
  let response
  let argsIndex = text.indexOf(' ')
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text

  switch (command) {
    case 'date':
      response = 'Today is ' + new Date().toDateString()
      break

    default:
      response = 'Unknown command: ' + command
  }

  TerminalService.emit('response', response)
}

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})
</script>

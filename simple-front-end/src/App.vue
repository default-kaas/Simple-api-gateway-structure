<template>
  <header>
    <h1
      class="text-3xl text-white font-bold bg-custom-vue-green border-b-4 border-b-custom-vue-gray p-2"
    >
      Simple front-end
    </h1>
  </header>
  <main class="p-2">
    <LoginForm />
    <LoadingCircle />
    <section class="flex flex-col items-center justify-center">
      <h2 class="font-bold text-lg p-1 border-custom-vue-gray border-b">
        Simple authentication service
      </h2>
      <PermissionStatus
        :permissionStatusName="'Permission for route 1'"
        :permissionStatusApiUrl="'/api/permission-route1'"
      />
      <PermissionStatus
        :permissionStatusName="'Permission for route 2'"
        :permissionStatusApiUrl="'/api/permission-route2'"
      />
    </section>
    <section class="flex flex-col items-center justify-center">
      <h2 class="font-bold text-lg p-1 border-custom-vue-gray border-b">
        Simple api service
      </h2>
      <PermissionStatus
        :permissionStatusName="'Permission for route 3'"
        :permissionStatusApiUrl="'/api/permission-route3'"
      />
    </section>
  </main>
</template>

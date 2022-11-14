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
    <CenterContentSection>
      <LegendPermissionStatus />
    </CenterContentSection>
    <CenterContentSection>
      <HeaderTwo>Simple authentication service </HeaderTwo>
      <PermissionStatus
        :permissionStatusName="'Permission for route 1'"
        :permissionStatusApiUrl="'/api/permission-route1'"
      />
      <PermissionStatus
        :permissionStatusName="'Permission for route 2'"
        :permissionStatusApiUrl="'/api/permission-route2'"
      />
      <PermissionStatus
        :permissionStatusName="'Permission for route 3'"
        :permissionStatusApiUrl="'/api/permission-route3'"
      />
    </CenterContentSection>
    <CenterContentSection>
      <HeaderTwo>Simple api service </HeaderTwo>
      <PermissionStatus
        :permissionStatusName="'Permission for route 4'"
        :permissionStatusApiUrl="'/api/permission-route4'"
      />
    </CenterContentSection>
  </main>
</template>

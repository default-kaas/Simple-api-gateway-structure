<script setup lang="ts">
import { PermissionStatusEnumerator } from "@/enumerators/permissionStatusEnumerator";
</script>

<template>
  <div class="my-1 p-2 bg-gray-100 rounded">
    <legend class="font-bold text-center">
      Legend of permission status symbols
    </legend>
    <div class="flex">
      <div class="mx-1">
        <PermissionStatusLegendRow
          :text="'Allowed'"
          :httpText="'http 200'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.ok"
        />
        <PermissionStatusLegendRow
          :text="'Not found'"
          :httpText="'http 404'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.notFound"
        />
        <PermissionStatusLegendRow
          :text="'Forbidden'"
          :httpText="'http 403'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.forbidden"
        />
        <PermissionStatusLegendRow
          :text="'Unauthorized'"
          :httpText="'http 401'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.unauthorized"
        />
      </div>
      <div class="mx-1">
        <PermissionStatusLegendRow
          :text="'Bad gateway'"
          :httpText="'http 502'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.badGateway"
        />
        <PermissionStatusLegendRow
          :text="'Server error'"
          :httpText="'http 500'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.serverError"
        />
        <PermissionStatusLegendRow
          :text="'Unknown'"
          :permissionStatusEnumerator="PermissionStatusEnumerator.unknown"
        />
      </div>
    </div>
  </div>
</template>

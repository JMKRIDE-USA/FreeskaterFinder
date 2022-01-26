import { useCreateMutation, invalidateCache, useGetQuery } from "@jeffdude/frontend-helpers"

export const useLookupLocation = () => {
  return useCreateMutation({
    endpoint: "location/lookup",
    method: "POST",
    verb: "looking up location",
  })
}

export const useSaveLocation = () => {
  return useCreateMutation({
    endpoint: "location/save",
    method: "POST",
    verb: "saving user location",
    options: { onSuccess: invalidateCache }
  })
}

export const useGetAllLocations = (options = {}) => {
  return useGetQuery("location/all", options)
}
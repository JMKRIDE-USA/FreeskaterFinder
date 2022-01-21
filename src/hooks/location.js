import { useCreateMutation, invalidateCache } from "@jeffdude/frontend-helpers"

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
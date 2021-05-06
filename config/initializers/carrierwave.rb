CarrierWave.configure do |config|
  config.fog_provider = 'fog/google'
  config.fog_credentials = {
      provider:               'Google',
      google_project:         ENV['GOOGLE_CLOUD_STORAGE_PROJECT_NAME'], #'my-project',
      google_json_key_string: ENV['GOOGLE_CLOUD_STORAGE_CREDENTIAL_CONTENT'] #'xxxxxx'
      # or use google_json_key_location if using an actual file
  }
  config.fog_directory = ENV['GOOGLE_CLOUD_STORAGE_BUCKET_NAME'] #'google_cloud_storage_bucket_name'
end

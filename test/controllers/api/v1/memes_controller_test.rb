require 'test_helper'

class Api::V1::MemesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_memes_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_memes_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_memes_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_memes_destroy_url
    assert_response :success
  end

end

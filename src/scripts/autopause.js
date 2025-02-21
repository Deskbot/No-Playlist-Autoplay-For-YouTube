{
  const autoplay = false;

  const ypm = document.getElementsByTagName('yt-playlist-manager')[0];

  if (ypm) {
    if ("canAutoAdvance_" in ypm.polymerController) {
      ypm.polymerController.canAutoAdvance_ = autoplay;

    } else if (ypm.TEST_ONLY.setCanAutoAdvance) {
      ypm.TEST_ONLY.setCanAutoAdvance(autoplay);

    } else if ("canAutoAdvance_" in ypm) {
      ypm.canAutoAdvance_ = autoplay;
    }
  }
}

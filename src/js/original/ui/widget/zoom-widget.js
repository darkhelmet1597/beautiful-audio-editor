goog.provide('audioCat.ui.widget.ZoomWidget');

goog.require('audioCat.ui.visualization.events');
goog.require('audioCat.ui.widget.SliderWidget');
goog.require('goog.dom.classes');


/**
 * A widget that controls zooming.
 * @param {!audioCat.utility.DomHelper} domHelper Facilitates interactions
 *     with the DOM.
 * @param {!audioCat.ui.visualization.TimeDomainScaleManager}
 *     timeDomainScaleManager Manages the zoom level representation.
 * @param {!audioCat.utility.dialog.DialogManager} dialogManager Manages
 *     dialogs.
 * @constructor
 * @extends {audioCat.ui.widget.SliderWidget}
 */
audioCat.ui.widget.ZoomWidget = function(
    domHelper,
    timeDomainScaleManager,
    dialogManager) {
  var numberOfScales = timeDomainScaleManager.getNumberOfScales();
  var defaultZoom = timeDomainScaleManager.getZoomLevel();
  goog.base(this,
      domHelper,
      goog.getCssName('zoomWidgetContainer'),
      'Zoom',
      '-',
      '+',
      0, // The number of decimals to round to.
      numberOfScales, // The number of divisions.
      0, // Min state value.
      numberOfScales - 1, // Max state value.
      timeDomainScaleManager.getZoomLevel(), // Initial zoom level.
      defaultZoom, // Default zoom level.
      dialogManager);
  if (FLAG_MOBILE) {
    // For mobile, narrow the slider to make the footer one row.
    goog.dom.classes.add(
        this.getDom(), goog.getCssName('mobileZoomWidgetContainer'));
  }

  // Change the slider value as the zoom changes.
  timeDomainScaleManager.listen(audioCat.ui.visualization.events.ZOOM_CHANGED,
      function(e) {
        this.setStateValue(timeDomainScaleManager.getZoomLevel());
      }, false, this);

  // Change the zoom as the slider shifts.
  this.performAsSliderShifts(function(stateValue) {
    timeDomainScaleManager.zoomToIndex(stateValue);
  });
};
goog.inherits(audioCat.ui.widget.ZoomWidget, audioCat.ui.widget.SliderWidget);

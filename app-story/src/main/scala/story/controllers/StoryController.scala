package story.controllers

import core.controllers.ApiController
import play.api.mvc.{Action, AnyContent, ControllerComponents}

class StoryController () (
  val controllerComponents: ControllerComponents,
) extends ApiController {

  def action(): Action[AnyContent] = Action {
    Ok(ApiResponse("story.action.successful", "test"))
  }

}

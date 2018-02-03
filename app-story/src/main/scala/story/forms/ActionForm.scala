package story.forms

import play.api.data.Form
import play.api.data.Forms._

object ActionForm {

  val form = Form(
    mapping(
      "action" -> nonEmptyText,
    )(Data.apply)(Data.unapply)
  )

  case class Data(
    action: String,
  )
}

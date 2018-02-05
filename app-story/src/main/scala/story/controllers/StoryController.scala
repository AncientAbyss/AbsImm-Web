package story.controllers

import javax.inject.Inject

import auth.utils.DefaultEnv
import com.mohiva.play.silhouette.api.Silhouette
import core.controllers.ApiController
import net.ancientabyss.absimm.history.{ DefaultHistory, HistoryType }
import net.ancientabyss.absimm.loader.StringLoader
import net.ancientabyss.absimm.parser.TxtParser
import play.api.cache.SyncCacheApi
import play.api.i18n.Messages
import play.api.mvc.{ Action, AnyContent, ControllerComponents }
import story.forms.ActionForm

import scala.collection.JavaConverters._
import scala.concurrent.Future
import scala.io.Source

class StoryController @Inject() (
  val controllerComponents: ControllerComponents,
  cache: SyncCacheApi,
  silhouette: Silhouette[DefaultEnv]
) extends ApiController {

  def action(): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    ActionForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("story.action.form.invalid", Messages("invalid.form"), form.errors)
      )),
      data => {
        val storyContent: String = Source.fromResource("story.txt").mkString
        val story = cache.getOrElseUpdate("story") { // TODO: cache per user
          // TODO: initialize before submitting the form, as the intro is shown too late currently
          val story = new StringLoader(new TxtParser()).load(storyContent)
          val history = new DefaultHistory()
          story.addHistory(history)
          story.tell()
          (story, history)
        }
        story._1.interact(data.action)
        val text = story._2.getAll.asScala
          .filter(x => x.getType == HistoryType.OUTPUT)
          .map(x => x.getText).mkString("<br/>")
          .replace("\\n", "<br/>").replace("\n", "<br/>")
        story._2.clear()
        Future.successful(Ok(ApiResponse("story.action.successful", text)))
      }
    )
  }
}

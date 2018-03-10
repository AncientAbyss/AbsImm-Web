package story.controllers

import javax.inject.Inject

import auth.utils.DefaultEnv
import com.mohiva.play.silhouette.api.Silhouette
import core.controllers.ApiController
import net.ancientabyss.absimm.core.Story
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

  def init(): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    cache.remove("story")
    Future.successful(Ok(ApiResponse("story.init.successfull", getResponse(getStory))))
  }

  def action(): Action[AnyContent] = silhouette.SecuredAction.async { implicit request =>
    ActionForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(
        ApiResponse("story.action.form.invalid", Messages("invalid.form"), form.errors)
      )),
      data => {
        val story: (Story, DefaultHistory) = getStory
        if (!data.action.isEmpty) {
          story._1.interact(data.action)
        }
        Future.successful(Ok(ApiResponse("story.action.successful", getResponse(story))))
      }
    )
  }

  private def getResponse(story: (Story, DefaultHistory)) = {
    val text = story._2.getAll.asScala
      .filter(x => x.getType == HistoryType.OUTPUT)
      .map(x => x.getText).mkString("<br/>")
      .replace("\\n", "<br/>").replace("\n", "<br/>")
    story._2.clear()
    text
  }

  private def initStory(): (Story, DefaultHistory) = {
    val storyContent: String = Source.fromResource("story.txt").mkString
    val story = new StringLoader(new TxtParser()).load(storyContent)
    val history = new DefaultHistory()
    story.addHistory(history)
    story.tell()
    (story, history)
  }

  private def getStory: (Story, DefaultHistory) = {
    val story = cache.getOrElseUpdate("story") { // TODO: cache per user
      initStory()
    }
    story
  }
}

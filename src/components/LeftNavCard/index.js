import React from "react"
import { connect } from "react-redux";
import { NavContainer, Atver, AuthorText, IconContainer, Circle } from "./style"
import Card from "../Card/index.js"
import Tags from "../Tags/index.js"
import { unit } from "../../utils/utils"
import ArticlesList from "../RecordArticlesList/index.js"


const LeftNavCard = ({ allTags, authorInfo, articles }) => {

  const { name, twitter, github, juejin, email } = authorInfo

  return (
    <NavContainer>
      <Atver src="https://user-gold-cdn.xitu.io/2020/3/15/170de4a08538606c?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1" />
      <AuthorText>{name}</AuthorText>
      <IconContainer>
        <Circle iconColor="rgb(96, 153, 237)">
          <a href={twitter} target="__blank">
            <i class="fab fa-twitter"></i>
          </a>
        </Circle>
        <Circle iconColor="#24292e">
          <a href={github} target="__blank">
            <i class="fab fa-github-alt"></i>
          </a>
        </Circle>
        <Circle iconColor="rgb(176, 10, 24)">
          <a href={`mailto:${email}`} target="_blank">
            <i class="fa fa-envelope"></i>
          </a>
        </Circle>
        <Circle iconColor="rgb(61, 108, 251)">
          <a href={juejin} target="__blank">
            <i class="fab fa-buffer"></i>
          </a>
        </Circle>
      </IconContainer>
      <Card header="标签" key="标签">
        <Tags list={allTags} />
      </Card>
      <Card header="最近的帖子" key="最近的帖子">
        <ArticlesList list={articles} />
      </Card>
      {/* <Card header="系列(数据未完成)" key="系列">
                <ArticlesList list={articles} />
            </Card> */}
    </NavContainer>
  )
}

const mapDispatchToProps = null;

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    articles: state._allArticles.articles,
    allTags: state._allArticles.articles.map(({ node }) => (node.frontmatter.tag)),
    authorInfo: state._siteMeta.authorInfo,
  }
}

const Connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftNavCard)

export default Connected;
import React from 'react';
import Layout from '../components/Layout/index.js';
import { graphql, Link } from "gatsby"
import styled from 'styled-components';

import Card from '../components/Card/index.js';
import ArticlesList from '../components/RecordArticlesList/index.js';
import Tags from '../components/Tags/index.js';
import { unit } from '../utils/utils';
import ArticleCard from '../components/ArticleCard/index.js';

const Atver = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: rgb(238, 207, 85);
    margin: 1rem 0 2rem 0;
    position: relative;

    ::before {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        content: 'H';
        font-size: 4rem;
        color: #fff;
    }
`;

const NavContainer = styled.div`
    background: rgb(255, 255, 255);
    width: 15rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    border-radius: .3rem;
    padding: 2rem 1rem;
    height: 40rem;

    position: sticky;
    top: 1rem;    
`;

const AuthorText = styled.div`
    margin-bottom: 1rem;
`;

const IconContainer = styled.div`
    display: flex;
`;

const Circle = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: rgb(238, 207, 85);
    margin: .5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    

    i {
        transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        color: #fff;
    }

    :hover {
        background: #fff;
    }

    :hover i {
        color: ${(props) => props.iconColor};
        transform: scale(2);
    }
`;

const ArticleContainer = styled.div`
    flex: 1;
    margin-left: 1rem;
`;



export default ({ data }) => {

    const allTag = unit(data.allTags.edges.map(({ node }) => (node.frontmatter.tag)));

    const {
        twitter,
        github,
        juejin,
        email,
    } = data.site.siteMetadata.author;
    return (
        <Layout>
            <NavContainer style={{ background: '#fff', width: '15rem', display: 'flex', flexFlow: 'co' }}>
                <Atver src="avter.png" />
                <AuthorText>
                    Hawei/大可
            </AuthorText>
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
                    <Tags list={allTag} />
                </Card>
                <Card header="最近的帖子" key="最近的帖子">
                    <ArticlesList list={data.allMarkdownRemark.edges} />
                </Card>
                {/* <Card header="系列(数据未完成)" key="系列">
                    <ArticlesList list={data.allMarkdownRemark.edges} />
                </Card> */}
            </NavContainer>
            <ArticleContainer>
                <ArticleCard list={data.allMarkdownRemark.edges} />
            </ArticleContainer>
        </Layout>
    )
}

export const query = graphql`
  query {
        site {
            siteMetadata {
                title
                author {
                    name
                    github
                    juejin
                    twitter
                    email
                }
            }

         
        }
        allMarkdownRemark {
            totalCount
            edges {
              node {
                id
                frontmatter {
                  title
                  date(formatString: "DD MMMM, YYYY")
                  tag
                  banner
                }
                fields {
                  slug
                }
                excerpt
              }
            }
        }
        allTags:   allMarkdownRemark(filter: {frontmatter: {tag: {ne: null}}}) {
            totalCount
            edges {
              node {
                id
                excerpt
                frontmatter {
                  tag
                  title
                  date(formatString: "DD MMMM, YYYY")
                }
                fields {
                    slug
                }
              }
            }
          }
    }
`
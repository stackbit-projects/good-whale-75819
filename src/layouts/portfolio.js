import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {getPages, Link, withPrefix} from '../utils';

export default class Portfolio extends React.Component {
    render() {
        let display_projects = _.orderBy(getPages(this.props.pages, '/portfolio'), 'frontmatter.date', 'desc');
        return (
            <Layout {...this.props}>
            <div className="inner outer">
              <header className="page-header inner-sm">
                <h1 className="page-title line-top">{_.get(this.props, 'page.frontmatter.title', null)}</h1>
                {_.get(this.props, 'page.frontmatter.subtitle', null) && (
                <p className="page-subtitle">{_.get(this.props, 'page.frontmatter.subtitle', null)}</p>
                )}
              </header>
              <div className={'portfolio-feed layout-' + _.get(this.props, 'page.frontmatter.layout_style', null)}>
                {_.map(display_projects, (post, post_idx) => (
                <article key={post_idx} className="project">
                  <Link href={withPrefix(_.get(post, '__metadata.urlPath', null))} className="project-link">
                    {_.get(post, 'frontmatter.thumb_image', null) && (
                    <div className="project-thumbnail">
                      <img src={withPrefix(_.get(post, 'frontmatter.thumb_image', null))} alt={_.get(post, 'frontmatter.thumb_image_alt', null)} />
                    </div>
                    )}
                    <header className="project-header">
                      <h2 className="project-title">{_.get(post, 'frontmatter.title', null)}</h2>
                    </header>
                  </Link>
                </article>
                ))}
              </div>
            </div>
            </Layout>
        );
    }
}

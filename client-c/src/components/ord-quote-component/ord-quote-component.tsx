import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'ord-quote',
  styleUrl: 'ord-quote-component.css'
})
export class OrdQuote {

  @Prop() quote: string;

  @Prop() author: string;

  render() {
    return (
      <blockquote>
        {this.quote}
        <span>{this.author}</span>
      </blockquote>
    );
  }
}



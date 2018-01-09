import { Token, ANTLRInputStream, CommonTokenStream } from 'antlr4ts';
import { gyooParser, ProgramContext } from '../gen/gyooParser';
import { gyooLexer } from '../gen/gyooLexer';
import { readFileSync } from 'fs';

let buffer = readFileSync("test1.gyoo", "utf8");

testLexer();

testParser();

function testLexer() {

    console.log("***testLexer");
    // Create the lexer and parser
    let inputStream = new ANTLRInputStream(buffer);
    let lexer = new gyooLexer(inputStream);

    let t: Token;

    // Ok I might have to get the book...

    do {
        t = lexer.nextToken();
        if (t.type != gyooLexer.EOF)
            console.log(t.line, t.text, lexer.vocabulary.getSymbolicName(t.type));

    } while (t.type != gyooLexer.EOF)


}


function testParser() {

    console.log("***testParser");

    // Create the lexer and parser
    let inputStream = new ANTLRInputStream(buffer);
    let lexer = new gyooLexer(inputStream);
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new gyooParser(tokenStream);

    // Parse the input, where `compilationUnit` is whatever entry point you defined
    let result = parser.program();
    console.log(result.toStringTree(parser));

}
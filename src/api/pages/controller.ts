import Transaction from "../../model/transaction";
import { isEmpty, pagingParams } from "../../utility/helpers";
import { Request, Response } from "express";
import Referral from "../../model/referral";
import { APP_URL, NEWAPI_API_KEY } from "../../utility/config";
import Plan from "../../model/plans";
import Investment from "../../model/investment";
import numeral from "numeral";
import dayjs from "dayjs";
import axios from "axios";
import Article from "../../model/articles";

const getNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'California wildfires',
        sortBy: 'publishedAt',
        language: 'en',
        apiKey: NEWAPI_API_KEY,
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching updates:', error.message);
  }
};

class Controller {
  async home(req: Request, res: Response) {
    const plans = await Plan.find()
    return res.render('index', { data: plans });
  }
  async donate(req: Request, res: Response) {
    try {
      let data = []
      const articles = await Article.findOne()

      if (!articles || dayjs().isAfter(dayjs(articles?.due_date))) {
        let result = await getNews()
        result = result.filter(a => a?.title !== "[Removed]").slice(0, 10)

        const payload = {
          articles: JSON.stringify(result),
          due_date: dayjs().add(12, "hours").toISOString()
        }
        if (articles) await articles.updateOne(payload)
        else await Article.create(payload)

        data = result
      } else {
        data = JSON.parse(articles.articles)
      }
      const timestamp = dayjs().format("DD MMM YYYY")
      const formatDate = (date: string) => dayjs(date).format("DD MMM YYYY")

      return res.render('donate', { timestamp, formatDate, articles: data });
    } catch (error) {
      console.log(error)
    }
  }
  async login(req: Request, res: Response) {
    return res.render('login');
  }
  async fogetpassword(req: Request, res: Response) {
    return res.render('foget-password');
  }
  async resetpassword(req: Request, res: Response) {
    const { token } = req?.query
    if (isEmpty(token)) {
      return res.redirect('/login');
    }
    return res.render('reset-password', { token });
  }
  async verifypassword(req: Request, res: Response) {
    return res.render('verify-password');
  }
  async realestate(req: Request, res: Response) {
    return res.render('real-estate');
  }
  async forex(req: Request, res: Response) {
    return res.render('forex');
  }
  async aboutus(req: Request, res: Response) {
    return res.render('about');
  }
  async commodities(req: Request, res: Response) {
    return res.render('commodities');
  }
  async stocks(req: Request, res: Response) {
    return res.render('stocks');
  }
  async cryptocurrencies(req: Request, res: Response) {
    return res.render('cryptocurrencies');
  }
  async faqs(req: Request, res: Response) {
    return res.render('faq');
  }
  async indices(req: Request, res: Response) {
    return res.render('indices');
  }
  async register(req: Request, res: Response) {
    let referral_code = null
    if (!isEmpty(req.params.id)) {
      referral_code = req.params.id;
    }
    return res.render('register', { referral_code });
  }
  async policy(req: Request, res: Response) {
    return res.render('policy');
  }
  async terms(req: Request, res: Response) {
    return res.render('terms');
  }
  async dashboard(req, res: Response) {
    let data = await Transaction.paginate(
      { user: req.user },
      { sort: { created_at: "desc" } }
    )

    const total_deposit = data.docs.filter(t => t.type === "deposit" && t.status === "approved").reduce((acc, tx) => numeral(acc).add(tx.amount).value(), 0)
    const total_withdraw = data.docs.filter(t => t.type === "withdraw" && t.status === "approved").reduce((acc, tx) => numeral(acc).add(tx.amount).value(), 0)
    return res.render('dashboard', { tx: data.docs, total_deposit, total_withdraw });
  }
  async transactions(req: any, res: Response) {
    const { page, limit } = pagingParams(req)

    let data = await Transaction.paginate(
      { user: req.user },
      { page, limit, sort: { created_at: "desc" } }
    )
    return res.render('transactions', { data });
  }
  async plans(req: Request, res: Response) {
    const plans = await Plan.find()
    return res.render('plans', { data: plans });
  }
  async investments(req: any, res: Response) {
    const { page, limit } = pagingParams(req)
    const data = await Investment.paginate(
      { user: req.user },
      { page, limit, sort: { created_at: "desc" } }
    )
    console.log(data)
    return res.render('investments', { data });
  }
  async settings(req: Request, res: Response) {
    return res.render('settings');
  }
  async deposit(req: Request, res: Response) {
    return res.render('deposit');
  }
  async withdraw(req: Request, res: Response) {
    return res.render('withdraw');
  }
  async contact(req: Request, res: Response) {
    return res.render('contact');
  }
  async referrals(req: any, res: Response) {
    const link = APP_URL + "/register/" + res.locals.user?.referral_code
    const data = await Referral.find({ user: req.user, paid: false }).populate("referee", "first_name last_name")
    const paid_balance = data.filter(d => d.paid).reduce((acc, d) => acc + d.reward, 0)
    const balance = data.filter(d => !d.paid).reduce((acc, d) => acc + d.reward, 0)
    // const pending_balance = data.filter(d => !d.completed).reduce((acc, d) => acc + d.reward, 0)
    return res.render('referrals', { balance, paid_balance, data, link });
  }
  async kyc(req: Request, res: Response) {
    return res.render('kyc');
  }
  async forgetpassword(req: Request, res: Response) {
    return res.render('forget-password');
  }
  async error(req: Request, res: Response) {
    return res.render('error');
  }
}

export default new Controller()